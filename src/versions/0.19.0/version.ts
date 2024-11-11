import {
  Interpreter,
  Parser,
  values,
  utils,
  Ast,
} from "aiscript0_19_0";
export { Interpreter, Parser, values, utils, Ast };
export const version = "0.19.0";
export const samples = {
  ["Hello AiScript"]: '<: "Hello, AiScript!"',
  FizzBazz: `for (let i, 100) {
	<: if (i % 15 == 0) "FizzBuzz"
		elif (i % 3 == 0) "Fizz"
		elif (i % 5 == 0) "Buzz"
		else i
}`,
};
