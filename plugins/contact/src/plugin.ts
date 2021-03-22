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
import { StringProperty, Ref } from '@anticrm/core'
import contact, { User, ContactService } from '.'

// import PersonProperties from './components/PersonProperties.vue'
// import UserLookup from './components/UserLookup.vue'
// import LoginWidget from './components/LoginWidget.vue'

import core, { CoreService } from '@anticrm/platform-core'
import { UIService, Asset } from '@anticrm/platform-ui'

/*!
 * Anticrm Platform™ Contact Plugin
 * © 2020 Anticrm Platform Contributors. All Rights Reserved.
 * Licensed under the Eclipse Public License, Version 2.0
 */
export default (platform: Platform, deps: { core: CoreService; ui: UIService }): Promise<ContactService> => {
  // platform.setResource(contact.component.PersonProperties, PersonProperties)
  // platform.setResource(contact.component.UserLookup, UserLookup)
  // platform.setResource(contact.component.LoginWidget, LoginWidget)

  const coreService = deps.core

  // const uiService = deps.ui

  function getUser(account: string): Promise<User> {
    return coreService.findOne(contact.mixin.User, { account: account as StringProperty }) as Promise<User>
  }

  async function getMyName(): Promise<string> {
    const whoAmI = platform.getMetadata(core.metadata.WhoAmI)
    if (!whoAmI) {
      return 'Nobody'
    }
    return getUser(whoAmI).then(user => user?.name)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getAvatar(user: Ref<User>): Asset {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../assets/ava2x48.jpg') as Asset
  }

  // uiService.addWidget(contact.component.LoginWidget)

  const service = {
    getUser,
    getMyName,
    getAvatar
  }

  // deps.ui.getApp()
  //   .provide(ContactServiceInjectionKey, service)

  return Promise.resolve(service)
}
