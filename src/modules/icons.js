export function addIconToImg(iconName, img) {
  import(`../images/icons/${iconName}.png`)
    .then((image) => {
      const iconSrc = image.default;

      img.src = iconSrc;
    })
    .catch((err) => {
      console.error("Icon could not be loaded: ", err);
    });
}
