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

import platform, { IntlStringId } from '../platform'

describe('i18n', () => {

  it('should return original string', () => {
    expect(platform.translate('does not exists' as IntlStringId)).toBe('does not exists')
  })

  it('should translate simple', () => {
    platform.loadStrings({
      idSimple: 'Русский'
    })
    expect(platform.translate('idSimple' as IntlStringId)).toBe('Русский')
  })

  it('should translate plurals', () => {
    platform.loadStrings({
      idPlural: '{count, plural, =1 {секунду} few {# секунды} many {# секунд} other {# секунду} } назад'
    })
    const message = 'idPlural' as IntlStringId
    expect(platform.translate(message, { count: 1 })).toBe('секунду назад')
    expect(platform.translate(message, { count: 2 })).toBe('2 секунды назад')
    expect(platform.translate(message, { count: 5 })).toBe('5 секунд назад')
    expect(platform.translate(message, { count: 11 })).toBe('11 секунд назад')
    expect(platform.translate(message, { count: 21 })).toBe('21 секунду назад')
    expect(platform.translate(message, { count: 22 })).toBe('22 секунды назад')
    expect(platform.translate(message, { count: 25 })).toBe('25 секунд назад')
  })
})