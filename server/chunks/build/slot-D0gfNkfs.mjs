import { renderSlot as renderSlot$1 } from 'vue';
import { f as flatUnwrap } from './ssrSlot-OqzLu9SG.mjs';

const renderSlot = (slots, name, props, ...rest) => {
  if (slots[name]) {
    return renderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap || props?.mdcUnwrap) }, name, props, ...rest);
  }
  return renderSlot$1(slots, name, props, ...rest);
};

export { renderSlot as r };
//# sourceMappingURL=slot-D0gfNkfs.mjs.map
