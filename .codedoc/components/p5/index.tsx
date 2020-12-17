import { ThemedComponentThis } from "@connectv/jss-theme"; // @see [CONNECTIVE JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme)
import { RendererLike } from "@connectv/html"; // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)
import { CodedocTheme } from "@codedoc/core"; // --> Type helper for theme object

import { P5Style } from "./style"; // @see tab:style.ts
import { content } from "../../content";
import { config } from "../../config";

export interface P5Options {
  // --> a nice interface for possible props
  sketch: string; // --> sketch location. Note that all props MUST be of type `string`
  id: string;
  width: string;
  height: string;
  sound: string;
  version: string;
  p5Lib: string;
  p5Sound: string;
  lib1: string;
  lib2: string;
  lib3: string;
  lib4: string;
  lib5: string;
}

export function P5(
  this: ThemedComponentThis, // --> keep typescript strict typing happy
  options: P5Options, // --> the component props (attributes)
  renderer: RendererLike<any, any>, // --> our beloved renderer
  content: any // --> the content of the component
) {
  const classes = this.theme.classes(P5Style); // --> fetch the theme-based classes
  // custom vars
  let version: string = options.version ? options.version : "1.1.9";
  let repo: string = config.misc?.github?.repo ? config.misc?.github?.repo : "dummy";
  let repoprefix: string = "/".concat(repo);
  let p5Lib: string = options.p5Lib ? repoprefix.concat(options.p5Lib) : 
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/".concat(version).concat("/p5.min.js");
  let p5Sound: string = options.p5Sound ? repoprefix.concat(options.p5Sound) :
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/".concat(version).concat("/addons/p5.sound.min.js");
  let sound: boolean = options.sound ? options.sound === "true" : options.p5Sound ? true : false;
  let libs: string = "<script src=".concat(p5Lib).concat("></script>");
  if (sound) {
    libs = libs.concat("<script src=".concat(p5Sound).concat("></script>"));
  }
  if (options.lib1) {
    libs = options.lib1.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib1).concat("></script>"))) : 
    libs.concat("<script src=".concat(repoprefix.concat(options.lib1).concat("></script>")));
  }
  if (options.lib2) {
    libs = options.lib2.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib2).concat("></script>"))) : 
    libs.concat("<script src=".concat(repoprefix.concat(options.lib2).concat("></script>")));
  }
  if (options.lib3) {
    libs = options.lib3.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib3).concat("></script>"))) : 
    libs.concat("<script src=".concat(repoprefix.concat(options.lib3).concat("></script>")));
  }
  if (options.lib4) {
    libs = options.lib4.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib4).concat("></script>"))) : 
    libs.concat("<script src=".concat(repoprefix.concat(options.lib4).concat("></script>")));
  }
  if (options.lib5) {
    libs = options.lib5.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib5).concat("></script>"))) : 
    libs.concat("<script src=".concat(repoprefix.concat(options.lib5).concat("></script>")));
  }
  let width: string = options.width ? options.width : "800";
  let height: string = options.height ? options.height : "600";
  let padding: number = 10;
  width = (+width + 2*(padding)).toString();
  height = (+height + 2*(padding)).toString();
  let name: string;
  if (options.sketch) {
    let filename = options.sketch.split("/").pop();
    name = filename!.substr(0, filename!.lastIndexOf("."));
  } else {
    name = options.id ? options.id : "inline";
  }
  let code: string = options.sketch ? "<script src=".concat(repoprefix.concat(options.sketch)).concat("></script>") :
  "<script>".concat((<div>{content}</div>)!.textContent!).concat("</script>");
  return (
    <iframe
      id={`${name}`} class={`${classes.p5} center`} style={`width: ${width}px; height: ${height}px`}
      srcdoc={`
        <!DOCTYPE html>
        <html>
          <head>
            ${libs}
            ${code}
          </head>
          <body>
          </body>
        </html>
      `}>
    </iframe>
  );
}