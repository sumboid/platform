//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { Model, MODEL_DOMAIN, AnyLayout, DomainIndex, Storage, Tx, TxContext } from '@anticrm/core'
import {
  CORE_CLASS_CREATE_TX,
  CORE_CLASS_DELETE_TX,
  CORE_CLASS_PUSH_TX,
  CORE_CLASS_UPDATE_TX,
  CreateTx,
  DeleteTx,
  PushTx,
  UpdateTx
} from '..'

/**
 * Perform model update and forward updates into chained storage if required.
 */
export class ModelIndex implements DomainIndex {
  private readonly storages: Storage[]
  private readonly model: Model

  constructor(model: Model, storages: Storage[]) {
    this.model = model
    this.storages = storages
  }

  async tx(ctx: TxContext, tx: Tx): Promise<any> {
    switch (tx._class) {
      case CORE_CLASS_CREATE_TX: {
        const createTx = tx as CreateTx
        if (this.model.getDomain(createTx._objectClass) !== MODEL_DOMAIN) {
          return
        }
        const newDoc = this.model.newDoc(createTx._objectClass, createTx._objectId, createTx.object)
        return Promise.all(this.storages.map(s => s.store(ctx, newDoc)))
      }
      case CORE_CLASS_UPDATE_TX: {
        const updateTx = tx as UpdateTx
        if (this.model.getDomain(updateTx._objectClass) !== MODEL_DOMAIN) {
          return
        }
        return Promise.all(
          this.storages.map(s =>
            s.update(ctx, updateTx._objectClass, updateTx._objectId, updateTx._query || null, updateTx._attributes)
          )
        )
      }
      case CORE_CLASS_PUSH_TX: {
        const pushTx = tx as PushTx
        if (this.model.getDomain(pushTx._objectClass) !== MODEL_DOMAIN) {
          return
        }
        return Promise.all(
          this.storages.map(s =>
            s.push(
              ctx,
              pushTx._objectClass,
              pushTx._objectId,
              pushTx._query || null,
              pushTx._attribute,
              pushTx._attributes
            )
          )
        )
      }
      case CORE_CLASS_DELETE_TX: {
        const deleteTx = tx as DeleteTx
        if (this.model.getDomain(deleteTx._objectClass) !== MODEL_DOMAIN) {
          return
        }
        return Promise.all(
          this.storages.map(s =>
            s.remove(ctx, deleteTx._objectClass, deleteTx._objectId, (deleteTx._query || null) as AnyLayout)
          )
        )
      }

      default:
        console.log('not implemented model tx', tx)
    }
  }
}
