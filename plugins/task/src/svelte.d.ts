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

declare module '*.svelte' {
  interface ComponentOptions<Props> {
    target: HTMLElement
    anchor?: HTMLElement
    props?: Props
    hydrate?: boolean
    intro?: boolean
  }

  interface Component<Props> {
    new (options: ComponentOptions<Props>): any
    $set: (props: Props) => any
    $on: (event: string, callback: (event: CustomEvent) => any) => any
    $destroy: () => any
    render: (
      props?: Props
    ) => {
      html: string
      css: { code: string; map?: string }
      head?: string
    }
  }

  const component: Component<Record<string, unknown>>

  export default component
}
