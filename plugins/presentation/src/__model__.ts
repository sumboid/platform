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

import core, { Builder, getClassifier, Class$, Prop, Mixin$, ArrayOf$, InstanceOf$, RefTo$ } from '@anticrm/model'

import { Doc, Obj, Type, mixinKey, MODEL_DOMAIN, Ref, Class } from '@anticrm/core'
import { VDoc } from '@anticrm/domains'
import { IntlString } from '@anticrm/platform-i18n'
import { AnyComponent, Asset } from '@anticrm/platform-ui'
import ui, { UXAttribute, Presenter, UXObject, ComponentExtension, Viewlet } from '.'
import { TDoc, TEmb, TMixin } from '@anticrm/model/src/__model__'

@Class$(ui.class.UXAttribute, core.class.Emb)
export class TUXAttribute extends TEmb implements UXAttribute {
  @Prop()
  key!: string

  @Prop()
  label!: IntlString

  @Prop()
  icon?: Asset

  @Prop()
  placeholder?: IntlString

  @Prop()
  visible!: boolean
}

@Mixin$(ui.mixin.Presenter, core.class.Mixin)
export class TPresenter<T extends Type> extends TMixin<T> implements Presenter<T> {
  @Prop()
  presenter!: AnyComponent
}

@Mixin$(ui.mixin.UXObject, core.class.Mixin)
export class TUXObject<T extends Obj> extends TMixin<T> implements UXObject<T> {
  @Prop()
  label!: IntlString

  @Prop()
  icon?: Asset

  @ArrayOf$()
  @InstanceOf$(ui.class.UXAttribute)
  attributes!: Record<string, UXAttribute>
}

@Mixin$(ui.mixin.DetailForm, core.class.Mixin)
export class TDetailForm<T extends VDoc> extends TMixin<T> implements ComponentExtension<T> {
  @Prop()
  component!: AnyComponent
}

@Mixin$(ui.mixin.LookupForm, core.class.Mixin)
export class TLookupForm<T extends VDoc> extends TMixin<T> implements ComponentExtension<T> {
  @Prop()
  component!: AnyComponent
}

@Mixin$(ui.mixin.CreateForm, core.class.Mixin)
export class TCreateForm<T extends VDoc> extends TMixin<T> implements ComponentExtension<T> {
  @Prop()
  component!: AnyComponent
}

@Class$(ui.mixin.Viewlet, core.class.Doc, MODEL_DOMAIN)
export class TViewlet extends TDoc implements Viewlet {
  @RefTo$(core.class.Class)
  displayClass!: Ref<Class<Doc>>

  @Prop() label!: IntlString
  @Prop() icon?: Asset
  @Prop() component!: AnyComponent
}

export function model(S: Builder): void {
  S.add(TUXAttribute, TPresenter, TUXObject, TDetailForm, TLookupForm, TCreateForm, TViewlet)

  S.mixin(core.class.Type, ui.mixin.Presenter, {
    presenter: ui.component.StringPresenter
  })

  S.mixin(core.class.String, ui.mixin.Presenter, {
    presenter: ui.component.StringPresenter
  })

  S.mixin(core.class.Number, ui.mixin.Presenter, {
    presenter: ui.component.StringPresenter
  })

  S.mixin(core.class.Boolean, ui.mixin.Presenter, {
    presenter: ui.component.CheckboxPresenter
  })

  S.mixin(core.class.RefTo, ui.mixin.Presenter, {
    presenter: ui.component.RefPresenter
  })

  S.mixin(core.class.ArrayOf, ui.mixin.Presenter, {
    presenter: ui.component.ArrayPresenter
  })

  S.createDocument(ui.mixin.Viewlet, {
    displayClass: core.class.Doc,
    label: 'Table' as IntlString,
    component: ui.component.TablePresenter
  })
}

export function UX(label: IntlString, icon?: Asset, presenter?: AnyComponent): any {
  function uxProp(target: any, propertyKey: string): void {
    const classifier = getClassifier(target)

    if (!classifier._mixins) {
      classifier._mixins = [ui.mixin.UXObject]
    } else {
      if (classifier._mixins.indexOf(ui.mixin.UXObject) === -1) {
        classifier._mixins.push(ui.mixin.UXObject)
      }
    }

    const attrsKey = mixinKey(ui.mixin.UXObject, 'attributes')
    const doc = (classifier as unknown) as Record<string, unknown>
    let attrs = doc[attrsKey] as Record<string, UXAttribute>
    if (!attrs) {
      attrs = {}
      doc[attrsKey] = attrs
    }
    const attr = Object.entries(attrs).find(a => a[0] === propertyKey)
    if (attr === undefined) {
      attrs[propertyKey] = {
        label,
        icon,
        visible: true,
        presenter
      } as UXAttribute
    } else {
      // Just update existing
      attr[1].label = label
      if (icon) {
        attr[1].icon = icon
      }
      if (presenter) {
        attr[1].presenter = presenter
      }
    }
  }

  function uxClass<C extends { new (): Doc }>(constructor: C) {
    const classifier = getClassifier(constructor.prototype)
    if (!classifier._mixins) {
      classifier._mixins = [ui.mixin.UXObject]
    } else {
      if (classifier._mixins.indexOf(ui.mixin.UXObject) === -1) {
        classifier._mixins.push(ui.mixin.UXObject)
      }
    }
    const doc = (classifier as unknown) as Record<string, unknown>
    doc[mixinKey(ui.mixin.UXObject, 'label')] = label
    if (icon) {
      doc[mixinKey(ui.mixin.UXObject, 'icon')] = icon
    }
  }

  return function (this: unknown, ...args: unknown[]): unknown {
    switch (args.length) {
      case 1:
        return uxClass.apply(this, args as [{ new (): Doc }])
      case 2:
      case 3:
        return uxProp.apply(this, args as [any, string])
      default:
        throw new Error('unsupported decorator')
    }
  }
}
