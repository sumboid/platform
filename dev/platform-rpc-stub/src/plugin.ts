//
// Copyright © 2020 Anticrm Platform Contributors.
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

import { Platform } from '@anticrm/platform'
import { ClientService } from '@anticrm/platform-rpc'
import { MemDb } from './memdb'
import { Ref, Class } from './types'
import rpcStub from '.'

/*!
  * Anticrm Platform™ Core Internationalization Plugin
  * Copyright © 2020 Anticrm Platform Contributors. All Rights Reserved.
  * Licensed under the Eclipse Public License, Version 2.0
  */
export default async (platform: Platform): Promise<ClientService> => {

  const metamodel = platform.getMetadata(rpcStub.metadata.Metamodel)
  if (!metamodel)
    throw new Error('metamodel required for rpc stub')

  const memdb = new MemDb()
  memdb.loadModel(metamodel)

  return {
    find (_class: string, query: {}): Promise<[]> {
      return memdb.find(_class as Ref<Class>, query) as Promise<[]>
    },
    async load (): Promise<[]> {
      return memdb.dump() as []
    }
  }

}