import React, { Component, Fragment } from "react";
import convert from "color-convert";
import randomcolor from "randomcolor";

const rgbSimple = /^#?[0-9,a-f,A-F]{3}|[0-9,a-f,A-F]{6}$/;
const hueTable = {
  red: convert.keyword.hsl("red")[0],
  orange: convert.keyword.hsl("orange")[0],
  yellow: convert.keyword.hsl("yellow")[0],
  green: convert.keyword.hsl("green")[0],
  blue: convert.keyword.hsl("blue")[0],
  indigo: convert.keyword.hsl("indigo")[0],
  violet: convert.keyword.hsl("violet")[0]
};
const startColor = randomcolor();

class App extends Component {
  constructor() {
    super();

    this.state = {
      lastGood: startColor,
      lastGoodHSL: convert.hex.hsl(startColor),
      baseColor: startColor,
      validColor: true
    };

    this.state.rainbow = this.generateRainbow(this.state.lastGoodHSL);
  }

  render() {
    const { lastGoodHSL } = this.state;
    return (
      <Fragment>
        <header>
          <h1>Huey</h1>
          <p>
            Enter a colour and get a range of hues with the same saturation and
            lightness
          </p>
        </header>

        <section>
          <div className="base-box">
            <div
              className="color-box"
              style={{
                backgroundColor: this.state.lastGood,
                margin: "5px auto"
              }}
            />
            <input
              type="text"
              value={this.state.baseColor}
              onChange={e => this.handleBaseColor(e.target.value)}
              size={7}
            />
            <button
              onClick={() => {
                this.handleBaseColor(randomcolor());
              }}
            >
              Random
            </button>
          </div>
          <div />
        </section>

        <section className="container">
          {Object.entries(this.generateRainbow(lastGoodHSL, 15)).map(
            ([color, rgb]) => {
              return (
                <div
                  key={color}
                  className="color-box"
                  style={{ backgroundColor: `#${rgb}` }}
                />
              );
            }
          )}
        </section>

        <section className="container">
          {Object.entries(this.generateRainbow(lastGoodHSL)).map(
            ([color, rgb]) => {
              return (
                <div
                  key={color}
                  className="color-box"
                  style={{ backgroundColor: `#${rgb}` }}
                />
              );
            }
          )}
        </section>

        <section className="container">
          {Object.entries(this.generateRainbow(lastGoodHSL, -15)).map(
            ([color, rgb]) => {
              return (
                <div
                  key={color}
                  className="color-box"
                  style={{ backgroundColor: `#${rgb}` }}
                />
              );
            }
          )}
        </section>

        <footer />
      </Fragment>
    );
  }

  handleBaseColor(value) {
    if (rgbSimple.test(value)) {
      const good = value.replace("#", "");
      const hsl = convert.hex.hsl(good);
      this.setState({
        lastGood: good,
        baseColor: value,
        lastGoodHSL: hsl
      });
    } else {
      this.setState({
        baseColor: value
      });
    }
  }

  generateRainbow(base, distance = 0) {
    return [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ].reduce((obj, color) => {
      obj[color] = convert.hsl.hex(
        hueTable[color] + distance,
        base[1],
        base[2]
      );
      return obj;
    }, {});
  }
}

export default App;
