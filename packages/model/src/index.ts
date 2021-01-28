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

import { AnyPlugin, identify } from '@anticrm/platform'
import { ArrayOf, Attribute, BagOf, Class, Classifier, Doc, Emb, Indices, InstanceOf, Mixin, Obj, Ref, RefTo, Type } from '@anticrm/core'
import Builder from './builder'

const modelIds = identify('model' as AnyPlugin, {
  class: {
    Obj: '' as Ref<Class<Obj>>,
    Emb: '' as Ref<Class<Emb>>,
    Doc: '' as Ref<Class<Doc>>,

    Classifier: '' as Ref<Class<Classifier<Obj>>>,

    Attribute: '' as Ref<Class<Attribute>>,
    Class: '' as Ref<Class<Class<Obj>>>,
    Mixin: '' as Ref<Class<Mixin<Obj>>>,

    // Data types
    Type: '' as Ref<Class<Type>>,
    String: '' as Ref<Class<Type>>,
    Number: '' as Ref<Class<Type>>,
    Boolean: '' as Ref<Class<Type>>,
    ArrayOf: '' as Ref<Class<ArrayOf>>,
    RefTo: '' as Ref<Class<RefTo<Doc>>>,
    BagOf: '' as Ref<Class<BagOf>>,
    InstanceOf: '' as Ref<Class<InstanceOf<Type>>>
  },
  mixin: {
    Indices: '' as Ref<Mixin<Indices>>
  }
})
console.log('model ids', modelIds)
export default modelIds

export { Builder }

export * from './utils'
export * from './dsl'
export * from './model'
