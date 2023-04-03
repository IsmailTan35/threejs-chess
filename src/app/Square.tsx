import { useEffect, useRef, useState } from "react";

interface ISquare {
  idx: number;
  selected: any;
  setSelected: any;
  stones: {
    position: number[];
    color: string;
    type: string;
  }[];
  attributes: any;
  setStep: any;
  setStones: any;
  setAttributes: any;
  position: any;
}

function Square(props: ISquare) {
  const { selected, setSelected, stones } = props;
  const deneme = useRef<any>();
  const [active, setActive] = useState(false);
  const x = parseInt((props.idx % 8).toString()[0]);
  const y = parseInt((props.idx / 8).toString()[0]);

  useEffect(() => {
    if (props.selected.type === "sah") {
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

      for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        if (
          props.selected.coordinate[0] + coordinate[0] === x &&
          props.selected.coordinate[1] + coordinate[1] === -y
        ) {
          deneme.current.color.setHex(0xff0000);
          setActive(true);
          break;
        }
      }
    } else if (props.selected.type === "vezir") {
      const dx = Math.abs(props.selected.coordinate[0] - x);
      const dy = Math.abs(props.selected.coordinate[1] + y);

      if (
        dx === dy ||
        props.selected.coordinate[0] === x ||
        props.selected.coordinate[1] === -y
      ) {
        deneme.current.color.setHex(0xff0000);
        setActive(true);
      } else {
        deneme.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      }
    } else if (props.selected.type === "fil") {
      const dx = Math.abs(props.selected.coordinate[0] - x);
      const dy = Math.abs(props.selected.coordinate[1] + y);

      if (dx === dy) {
        deneme.current.color.setHex(0xff0000);
        setActive(true);
      } else {
        deneme.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      }
    } else if (props.selected.type === "kale") {
      const dx = Math.abs(props.selected.coordinate[0] - x);
      const dy = Math.abs(props.selected.coordinate[1] + y);

      if (dx === 0 || dy === 0) {
        deneme.current.color.setHex(0xff0000);
        setActive(true);
      } else {
        deneme.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      }
    } else if (props.selected.type === "piyon") {
      const carp = props.selected.color === "white" ? 1 : -1;
      let coordinates = [[0, carp * -1]];

      if (
        !props.attributes[props.selected.color].movedPiyon?.includes(
          props.selected.id
        )
      ) {
        coordinates.push([0, carp * -2]);
      }
      for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        if (
          props.selected.coordinate[0] + coordinate[0] === x &&
          props.selected.coordinate[1] + coordinate[1] === -y
        ) {
          deneme.current.color.setHex(0xff0000);
          setActive(true);
          break;
        }
      }
    } else if (props.selected.type === "at") {
      const coordinates = [
        [-1, -2],
        [1, -2],
        [2, -1],
        [-2, -1],
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
      ];

      for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        if (
          props.selected.coordinate[0] + coordinate[0] === x &&
          props.selected.coordinate[1] + coordinate[1] === -y
        ) {
          deneme.current.color.setHex(0xff0000);
          setActive(true);
          break;
        }
      }
    } else {
      deneme.current.color.setHex((x + y) % 2 === 0 ? 0x512500 : 0x808080);
      setActive(false);
    }
  }, [selected]);

  return (
    <mesh
      scale={1}
      {...props}
      onPointerOver={event => {
        if (!active) return;
        deneme.current.color.setHex(0x00ff00);
      }}
      onPointerOut={event => {
        if (!active) return;
        deneme.current.color.setHex(0xff0000);
      }}
      onClick={event => {
        if (
          props.selected.type === "" ||
          (props.selected.coordinate[0] === x &&
            props.selected.coordinate[1] === -y) ||
          !active
        )
          return;
        props.setStones((prv: any) => {
          const newPrv = [...prv];

          newPrv[props.selected.id].position = [x, -y, 0.65];
          return newPrv;
        });
        // props.setSelected({
        //   id: props.selected.id,
        //   color: props.selected.color,
        //   type: props.selected.type,
        //   coordinate: [x, -y, 0.65],
        // });
        props.setStep((prv: any) => (prv === "white" ? "black" : "white"));
        setTimeout(() => {
          props.setSelected({
            id: null,
            color: "",
            type: "",
            coordinate: [0, 0, 0.65],
          });
        }, 100);
        if (props.selected.type === "piyon") {
          props.setAttributes[props.selected.color]((prv: any) => ({
            ...prv,
            movedPiyon: [...prv.movedPiyon, props.selected.id],
          }));
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={deneme} />
    </mesh>
  );
}

export default Square;
