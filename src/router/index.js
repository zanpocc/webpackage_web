import Vue from 'vue'
import Router from 'vue-router'

import Replace from '@/components/text/Replace'
import Format from '@/components/text/Format'
import CodeGenerate from '@/components/database/CodeGenerate'
import ER from '@/components/database/ER'
import LocalTerminal from '@/components/terminal/Local'
import RemoteTerminal from '@/components/terminal/Remote'
import Redis from '@/components/software/Redis'
import MongoDB from '@/components/software/MongoDB'
import Zookeeper from '@/components/software/Zookeeper'
import Kafka from '@/components/software/Kafka'

Vue.use(Router)

// 路由映射组件
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
    },
    {
      path: '/terminal/local',
      name: 'LocalTerminal',
      component: LocalTerminal
    },
    {
      path: '/terminal/remote',
      name: 'RemoteTerminal',
      component: RemoteTerminal
    },
    {
      path: '/software/redis',
      name: 'Redis',
      component: Redis
    },
    {
      path: '/software/mongodb',
      name: 'MongoDB',
      component: MongoDB
    },
    {
      path: '/software/kafka',
      name: 'Kafka',
      component: Kafka
    },
    {
      path: '/software/zookeeper',
      name: 'Zookeeper',
      component: Zookeeper
    }
  ]
})
