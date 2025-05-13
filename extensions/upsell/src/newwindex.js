import {
  extend,
  BlockStack,
  Text,
} from "@shopify/checkout-ui-extensions";

extend("Checkout::Dynamic::Render", (root) => {
  const block = root.createComponent(BlockStack, {}, [
    root.createComponent(Text, {}, "Hello from upsell block!"),
  ]);

  root.appendChild(block);
});
