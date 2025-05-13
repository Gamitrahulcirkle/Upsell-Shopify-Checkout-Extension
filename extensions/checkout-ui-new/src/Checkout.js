import {
  extension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
} from "@shopify/ui-extensions/checkout";

// Your gift variant ID as a string
const GIFT_VARIANT_ID = "44402514788537";

export default extension("purchase.checkout.block.render", (root, api) => {
  const checkbox = root.createComponent(
    Checkbox,
    {
      onChange: async (checked) => {
        if (checked) {
          // ✅ Add gift product
          await api.applyCartLinesChange({
            type: "addCartLine",
            merchandiseId: `gid://shopify/ProductVariant/${GIFT_VARIANT_ID}`,
            quantity: 1,
          });
        } else {
          // ❌ Remove gift product if present
          const lines = api.cart.lines.current;
          const giftLine = lines.find(
            (line) => line.merchandise.id === `gid://shopify/ProductVariant/${GIFT_VARIANT_ID}`
          );
          if (giftLine) {
            await api.applyCartLinesChange({
              type: "removeCartLine",
              id: giftLine.id,
            });
          }
        }
      },
    },
    "Yes, add a free gift"
  );

  const banner = root.createComponent(
    Banner,
    { title: "Free Gift Option", status: "info" },
    "Would you like to receive a free gift with your order?"
  );

  const block = root.createComponent(BlockStack, { spacing: "loose" }, [
    banner,
    checkbox,
  ]);

  root.append(block);
});
