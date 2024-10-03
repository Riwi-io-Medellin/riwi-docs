import { LoadContext, Plugin } from '@docusaurus/types';

export default function authPlugin(context: LoadContext, options: any): Plugin {
  console.log("sdsd")
  return {
    name: 'auth-plugin',
    getClientModules() {
      return [require.resolve('./auth.ts')];
    }
  };
}
