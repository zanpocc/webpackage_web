import Vue from 'vue'
import Router from 'vue-router'
import Replace from '@/components/text/Replace'
import Format from '@/components/text/Format'
import CodeGenerate from '@/components/database/CodeGenerate'
import ER from '@/components/database/ER'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/text/replace',
      name: 'Replace',
      component: Replace
    },
    {
      path: '/text/format',
      name: 'Format',
      component: Format
    },
    {
      path: '/database/codeGenerate',
      name: 'CodeGenerate',
      component: CodeGenerate
    },
    {
      path: '/database/er',
      name: 'ER',
      component: ER
    }
  ]
})
