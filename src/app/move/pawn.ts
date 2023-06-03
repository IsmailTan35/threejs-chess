interface IPawn {
  selected: any;
  attributes: any;
  stone: any;
  ref: any;
  setActive: any;
  stones: any;
  x: any;
  y: any;
}

function Pawn(props: IPawn) {
  const { stones, selected, setActive, ref, x, y } = props;
  const carp = props.selected.color === "white" ? 1 : -1;
  let coordinates = [
    [-1, carp * -1],
    [1, carp * -1],
    [0, carp * -1],
  ];

  if (
    !props.attributes[props.selected.color].movedPawn?.includes(
      props.selected.id
    )
  ) {
    coordinates.push([0, carp * -2]);
  }
  const filteredArr: any = stones.find((stone: any) => {
    return stone.position[0] === x && stone.position[1] === -y;
  });
  const secondFilteredArr: any = stones.find(
    (stone: any) =>
      stone.position[0] === x && stone.position[1] === carp * +1 - y
  );

  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i];
    if (
      props.selected.coordinate[0] + coordinate[0] === x &&
      props.selected.coordinate[1] + coordinate[1] === -y
    ) {
      switch (i) {
        case 0:
          if (filteredArr && filteredArr.color !== props.selected.color) {
            ref.current.color.setHex(0xeeffee);
            setActive(true);
          }
          break;
        case 1:
          if (filteredArr && filteredArr.color !== props.selected.color) {
            ref.current.color.setHex(0xeeffee);
            setActive(true);
          }
          break;
        case 2:
          if (!filteredArr) {
            ref.current.color.setHex(0x00ff00);
            setActive(true);
          }
          break;
        case 3:
          if (!filteredArr && !secondFilteredArr) {
            ref.current.color.setHex(0x00ff00);
            setActive(true);
          }
          break;
      }
      break;
    } else {
      ref.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      setActive(false);
    }
  }
}

export default Pawn;
