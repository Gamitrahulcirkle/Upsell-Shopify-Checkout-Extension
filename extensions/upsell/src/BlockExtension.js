import {
  extension,
  AdminBlock,
  BlockStack,
  Text
} from "@shopify/ui-extensions/admin";

// Correct target for Checkout UI Extension
const TARGET = 'checkout_ui_extension.checkout.block.render';

export default extension(TARGET, (root, { i18n, data }) => {
  console.log({ data });

  root.append(
    root.createComponent(
      AdminBlock,
      { title: "Checkout Upsell Block" },
      root.createComponent(BlockStack, null,
        root.createComponent(Text, { fontWeight: "bold" }, i18n.translate('upsell_message', { target: TARGET }))
      )
    )
  );
});
