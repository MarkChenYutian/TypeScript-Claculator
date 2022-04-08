# TypeScript *Clac*ulator

An implementation of the `Clac` language in *15-122 Imperative Programming* with TypeScript.

## The Clac Language

*Clac* is a stack-based language. All operators are in a queue, and operands are in a stack. Everytime, an operator will obtain operand from the stack and push the result back to stack.

*Clac* uses a postfix expression to calculate, that is, you need to write `1 1 +` instead of `1 + 1`.

There are a series of native operators defined in Clac, shown as follow:

<img width="831" alt="Screen Shot 2022-03-05 at 17 09 09" src="https://user-images.githubusercontent.com/47029019/156901409-ec3e5341-5ccb-49c6-8235-5c43695e78e4.png">

**What makes Clac powerful is the abilty to define Symbols (Macros).** You can define a specific symbol as a queue of operands. Everytime the interpretor meets a new symbol, it will replace it with the pre-defined queue of operands.

What's more, you can define new symbols upon previously defined symbols. This provides very useful abstraction tool.

The syntax for defining symbol is

```
: Symbol op1 op2 op3 ;
```

For example, below lines define two Symbols - `dup` and `square`

```
// Note: TypeScript clac does NOT support comment, do not put anything after (including) "//" into the input.
: dup 1 pick ;    // S: x => S: x, x
: square dup * ;  // S: x => S: x**2
```
## How to Use It (Web Version)

Type your clac line into the input box, then
* Click `STEP` if you want to see it executing step-by-step.
* Click `RUN` if you just want to execute it with one click.

## How to Run (Locally)

Open the terminal in root directory of this repo, then run with

```shell
$ npm start
```

## How to Deploy (to GitHub Pages)

```
$ npm run deploy
```

## TODO

* Elegant Error Handling (Currently use `alert` directly because I'm tired)
* 🛠️ Improve Symbol define function such to enable nested definition of symbol. For instance, the following sequence should be valid.
  ```
  : redef_f : f 2 + ; ;
  ```

## Obfuscation Settings

```
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```