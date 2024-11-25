import type { AsyncSvelteComponent } from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';

// route definition
const routes = {
  '/': wrap({
    asyncComponent: (() => import('../pages/Home.svelte')) as unknown as AsyncSvelteComponent
  }),
  '/read': wrap({
    asyncComponent: (() => import('../pages/Read.svelte')) as unknown as AsyncSvelteComponent
  }),
  '/collection': wrap({
    asyncComponent: (() => import('../pages/Collection.svelte')) as unknown as AsyncSvelteComponent
  })
};

export default routes;
