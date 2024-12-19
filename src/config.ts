// 应用运行时配置
import { lazy } from 'react';
import Home from './pages/home';

const Read = lazy(() => import('./pages/read'));
const Todo = lazy(() => import('./pages/todo'));
const Collect = lazy(() => import('./pages/collect'));

// 应用的场景类型
export const sceneList = [
  {
    icon: '',
    id: 'home',
    label: '写作',
    path: '/',
    Component: Home
  },
  {
    icon: '',
    id: 'read',
    label: '订阅',
    path: '/read',
    Component: Read,
  },
  {
    icon: '',
    id: 'todo',
    label: '待办',
    path: '/todo',
    Component: Todo,
  },
  {
    icon: '',
    id: 'collect',
    label: '收藏',
    path: '/collect',
    Component: Collect,
  }
]
