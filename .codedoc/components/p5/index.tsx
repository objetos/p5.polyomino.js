import { ThemedComponentThis } from "@connectv/jss-theme"; // @see [CONNECTIVE JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme)
import { RendererLike } from "@connectv/html"; // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)
import { CodedocTheme } from "@codedoc/core"; // --> Type helper for theme object

import { P5Style } from "./style"; // @see tab:style.ts
import { content } from "../../content";

export interface P5Options {
  // --> a nice interface for possible props
  sketch: string; // --> sketch location. Note that all props MUST be of type `string`
  id: string;
  width: string;
  height: string;
  sound: string;
}

export function P5(
  this: ThemedComponentThis, // --> keep typescript strict typing happy
  options: P5Options, // --> the component props (attributes)
  renderer: RendererLike<any, any>, // --> our beloved renderer
  content: any // --> the content of the component
) {
  const classes = this.theme.classes(P5Style); // --> fetch the theme-based classes
  // custom vars
  let repo: string = "p5.quadrille.js";
  let libname: string = "/".concat(repo);
  let p5Lib: string = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js";
  let p5Sound: string = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js";
  let sound: boolean = options.sound ? (options.sound === 'true') : true;
  let lib1: string = "/docs/sketches/p5.quadrille.js";
  let width: string = options.width ? options.width : "800";
  let height: string = options.height ? options.height : "600";
  let border: number = 10;
  width = (+width + 2*border).toString();
  height = (+height + 2*border).toString();
  if (options.sketch) {
    let filename = options.sketch.split("/").pop();
    let name: string = filename!.substr(0, filename!.lastIndexOf("."));
    return (
      <iframe
        id={`${name}`} class={`${classes.p5} center`} style={`width: ${width}px; height: ${height}px`}
        srcdoc={`
        <!DOCTYPE html>
        <html>
          <head>
            ${sound ? "<script src=".concat(p5Lib).concat("></script>").concat("<script src=".concat(p5Sound).concat("></script>")) : "<script src=".concat(p5Lib).concat("></script>")}
            <script src=${libname.concat(lib1)}></script>
            <script src=${libname.concat(options.sketch)}></script>
          </head>
          <body>
          </body>
        </html>
    `}>
    </iframe>
  );
  } else {
    let name = options.id ? options.id : "inline";
    return (
      <iframe
      id={`${name}`} class={`${classes.p5} center`} style={`width: ${width}px; height: ${height}px`}
      srcdoc={`
      <!DOCTYPE html>
      <html>
        <head>
          <script src=${p5Lib}></script>
          <script src=${libname.concat(lib1)}></script>
          <script> ${content} </script>
        </head>
        <body>
        </body>
      </html>
    `}>
    </iframe>
    );
  }
}