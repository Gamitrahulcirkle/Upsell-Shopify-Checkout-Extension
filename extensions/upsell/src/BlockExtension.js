import {
  extension,
  Banner,
  BlockStack,
  Checkbox,
  Image,
} from "@shopify/ui-extensions/checkout";

export default extension("purchase.checkout.block.render", (root, api) => {
  // Get settings from the extension configuration
  const {
    upsell_variant,
    checkbox_label,
    banner_title,
    banner_text,
    image_url, // if you added this too
  } = api.settings.current;

  const newLines = api.lines.current;
  const checkEsting = newLines.find((line) => line.merchandise.id === `${upsell_variant}` ); 
  const isChecked = !!checkEsting;
  // Create the checkbox component
  console.log(upsell_variant);
  const checkbox = root.createComponent(    
    Checkbox,
    {
      checked: isChecked,      
      onChange: async (checked) => {
        if (checked) {
          await api.applyCartLinesChange({
            type: "addCartLine",
            merchandiseId: `${upsell_variant}`,
            quantity: 1,
          });
        } else {
          const lines = api.lines.current;          
          const existingLine = lines.find((line) => {           
            return line.merchandise.id === `${upsell_variant}`;
          });

          if (existingLine) {
            (async () => {
              try {
                await api.applyCartLinesChange({
                  type: "updateCartLine",
                  id: existingLine.id,
                  quantity:0
                });
              } catch (error) {
                console.error("Failed to remove cart line:", error);
              }
            })();
          }
        }
      },
    },
    checkbox_label || "Add this product"
  );

  // Optional: product image
  const productImage = image_url
    ? root.createComponent(Image, {
        source: image_url,
        description: "Upsell product image",
        border: true,
      })
    : null;

  // Banner component
  const banner = root.createComponent(
    Banner,
    { title: banner_title || "Special Offer!", status: "info" },
    banner_text || "Don't miss this exclusive offer!"
  );

  // Stack components
  const stackChildren = [banner];
  if (productImage) stackChildren.push(productImage);
  stackChildren.push(checkbox);

  const block = root.createComponent(BlockStack, { spacing: "loose" }, stackChildren);

  root.append(block);
});
