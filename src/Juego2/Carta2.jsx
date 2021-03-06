import React from "react";
import {css, StyleSheet} from "aphrodite";
import {useDimensions} from "./useDimensions";

const colorVerde = "#2E7D32";
const colorRojo = "#c62828";
const colorAzul = "#1565C0";

export function Carta2(props) {
    const valor = props.valor ?? 0;
    const movimiento = props.movimiento ?? "none";
    const fnDescartar = props.fnDescartar ?? (() => {});
    const escala = props.escala ?? 1;

    const [pH] = useDimensions();

    const estilos = StyleSheet.create({
        contCarta: {
            position: "relative",
            fontSize: `${pH * 4.5 * escala}px`,
            fontWeight: "normal",
            fontFamily: "'PT Serif', serif",
            display: "table-cell",
            color: "#151515",
            backgroundColor: "white",
            border: `solid ${pH * 0.225 * escala}px #151515`,
            borderRadius: "0.1rem",
            boxShadow: `${pH * 0.15 * escala}px ${pH * 0.15 * escala}px ${pH * 0.3 * escala}px 0 #151515`,
            width: `${pH * 5 * escala}px`,
            height: `${pH * 8.5 * escala}px`,
            minWidth: `${pH * 5 * escala}px`,
            textAlign: "center",
            verticalAlign: "middle",
            cursor: "pointer",
            transition: "transform 50ms, opacity 50ms",
            userSelect: "none"
        },
        carta: {
            display: "inline-block",
            borderRadius: `${pH * 0.4 * escala}`
        },
        cRojo: {
            color: colorRojo
        },
        cReyes: {
            color: colorVerde
        },
        tRojo: {
            width: "100%",
            backgroundColor: colorRojo
        },
        tVerde: {
            width: "100%",
            backgroundColor: colorVerde
        },
        tAzul: {
            width: "100%",
            backgroundColor: colorAzul
        },
        imgDragon: {
            width: "90%",
            height: "auto",
            display: "inline-block",
            bottom: "0",
            verticalAlign: "middle"
        },
        cartaTraseraInner: {
            display: "inline-block",
            width: "60%",
            height: "80%",
            border: `solid ${pH * 0.4 * escala}px rgba(21, 21, 21, 0.75)`,
            borderRadius: "0.1rem",
        }
    });

    const tipo = (valor << 23) >>> 28;
    const tipoCarta = (() => {
        switch (tipo) {
            case 1:
                return "cRojo";
            case 3:
                return "tRojo";
            case 4:
                return "tVerde";
            case 5:
                return "tAzul";
            case 6:
            case 7:
            case 8:
                return "cReyes";
            default:
                return "";
        }
    })();

    const valorC = (() => {
        switch (tipo) {
            case 0:
            case 1:
                return (valor << 27) >>> 28;
            case 6:
                return "J";
            case 7:
                return "Q";
            case 8:
                return "K";
            default:
                return "&nbsp;"
        }
    })();

    const transformacion = StyleSheet.create({
        tra: (valor !== -1)
            ? {
                opacity: "1",
                transform: movimiento,
                ":hover": {
                    transform: (movimiento === "none" ? `translateY(${-pH * 1 * escala}px)` : `translateY(${-pH * 1 * escala}px) ${movimiento}`)
                }
            }
            : {
                opacity: "0",
                transform: "translateY(-1rem)",
                cursor: "default",
                zIndex: "-1"
            }
    });

    const clasesCartaInner = css(
        estilos.carta,
        estilos[tipoCarta]
    );

    const e = (() => {
        if (valor === 0) {
            return <span className={css(estilos.cartaTraseraInner)} dangerouslySetInnerHTML={{__html: "&nbsp;"}}/>;
        } else if (tipo === 2 || tipo === 3 || tipo === 4 || tipo === 5) {
            let color;
            switch (tipo) {
                case 2:
                    color = "negro";
                    break;
                case 3:
                    color = "rojo";
                    break;
                case 4:
                    color = "verde";
                    break;
                default:
                    color = "azul";
            }
            return (
                <span style={{display: "flex", alignItems: "center", height: "inherit"}}>
                    <img className={css(estilos.imgDragon)} src={`/img/Dragon_${color}.webp`} alt="Dragon"/>
                </span>
            )
        } else {
            return <span className={clasesCartaInner} dangerouslySetInnerHTML={{__html: valorC}}/>;
        }
    })();

    const fn = () => {
        fnDescartar(valor);
    };

    return (
        <span className={css(estilos.contCarta, transformacion.tra)} onClick={fn}>
            {e}
        </span>
    );
}
