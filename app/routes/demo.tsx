import type { Route } from './+types/demo';
import { ChakraDemo } from '../components/chakra-demo';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Chakra UI Demo' },
    { name: 'description', content: 'Chakra UI v3 component showcase' },
  ];
}

export default function Demo() {
  return <ChakraDemo />;
}
