/*! Antierp Platform
// Copyright © 2020 Andrey Platov <andrey.v.platov@gmail.com>
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
*/

import { Plugin } from './extension'
import core, { pluginId, Obj, Ref, Class, Session } from './types'
import { Model, loadConstructors } from './reflect'

@Model(core.class.Object)
class TObject implements Obj {
  _class!: Ref<Class<this>>

  getSession(): Session { throw new Error('object not attached to a session') }
  getClass(): Class<this> { return this.getSession().getInstance(this._class) }
  toIntlString(): string { return this.getClass().toIntlString() }
}

export default new Plugin(pluginId, () => {
  loadConstructors(core.class, {
    Object: TObject
  })
})
