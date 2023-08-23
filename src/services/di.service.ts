import { ContainerBuilder } from "node-dependency-injection";
import { Service } from "./service";

let container = new ContainerBuilder();

container.register('service', Service);

export default container;