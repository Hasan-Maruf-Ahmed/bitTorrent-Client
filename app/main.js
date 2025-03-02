const process = require("process");
const util = require("util");


function decodeBencode(bencodedValue) {
  if(bencodedValue.startsWith("i")){
    if(!bencodedValue.endsWith("e")){
      throw new Error("Invalid encoded value.");
    }
    return parseInt(bencodedValue.substring(1, bencodedValue.length -1));
  }
  else if (!isNaN(bencodedValue[0])) {
    const firstColonIndex = bencodedValue.indexOf(":");
    if (firstColonIndex === -1) {
      throw new Error("Invalid encoded value");
    }
    return bencodedValue.substr(firstColonIndex + 1);
  }
  else if (bencodedValue.startsWith("l")){
    if(!bencodedValue.endsWith("e")){
      throw new Error("Invalid encoded value");
    }
    bencodedValue = bencodedValue.substring(1, bencodedValue.length -1)
    let i=0
    let result = []
    if (bencodedValue === ""){
      return result;
    }
    while (i<bencodedValue.length)
    {
      const [value, endIndex] = bencodedList(bencodedValue.substring(i));
      result.push(value)
      i += endIndex;
    }
    return result;
  }
  else {
    throw new Error("Only strings and integers are supported at the moment");
  }
}

function bencodedList(bencodedString) {
  if(bencodedString.startsWith("i")){
    firstEIndex = bencodedString.indexOf("e");
    return [bencodedString.substring(1, firstEIndex), firstEIndex+1];
  }
  else if(!isNaN(bencodedString[0])){
    firstColonIndex = bencodedString.indexOf(":");
    length = parseInt(bencodedString.substr(0, firstColonIndex))
    return [bencodedString.substr(firstColonIndex+1, length), length + 1 + firstColonIndex]
  }
}

function main() {
  const command = process.argv[2];

  if (command === "decode") {
    const bencodedValue = process.argv[3];

    console.log(JSON.stringify(decodeBencode(bencodedValue)));
  } else {
    throw new Error(`Unknown command ${command}`);
  }
}

main();
