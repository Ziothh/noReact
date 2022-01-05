export * as VirtualDOM from "./VirtualDOM"

export * from "./DOM"

import { createElement} from "./VirtualDOM"
createElement("a", {src: "h", style: {background: "red"}})