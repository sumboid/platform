//
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
//

import Theme from '../components/Theme.vue'

import ui from '@anticrm/platform-ui'
import platform from '@anticrm/platform'

import Icon from '@anticrm/platform-ui/src/components/Icon.vue'
import PropPanel from '@anticrm/platform-ui/src/components/PropPanel.vue'

import { contact1 } from '@anticrm/dev-boot/src/testModel'

import { pluginId as corePluginId } from '@anticrm/platform-core'

export default {
  title: 'Framework'
}

export const icon = () => ({
  render() {
    return <Theme><Icon icon={ui.icon.Add}>Hello Button</Icon></Theme>
  }
})

const corePlugin = platform.getPlugin(corePluginId)
const contact = corePlugin.getInstance(contact1)
const props = ['phone', 'email']

export const properties = () => ({
  render() {
    return <Theme><PropPanel object={contact} filter={props}></PropPanel></Theme>
  }
})