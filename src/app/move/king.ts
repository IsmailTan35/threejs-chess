interface IKing {
  selected: any;
  attributes: any;
  stone: any;
  ref: any;
  setActive: any;
  stones: any;
  x: any;
  y: any;
}

function King(props: IKing) {
  const { stones, selected, setActive, ref, x, y } = props;
  const coordinates = [
    [0, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
  ];
  const filteredArr: any = stones.find((stone: any) => {
    return stone.position[0] === x && stone.position[1] === -y;
  });

  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i];

    if (
      props.selected.coordinate[0] + coordinate[0] === x &&
      props.selected.coordinate[1] + coordinate[1] === -y
    ) {
      if (filteredArr || filteredArr?.color === props.selected.color) {
        ref.current.color.setHex(0xff0000);
        setActive(false);
      } else {
        ref.current.color.setHex(0x00ff00);
        setActive(true);
      }
      break;
    } else {
      ref.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      setActive(false);
    }
  }
}

export default King;
