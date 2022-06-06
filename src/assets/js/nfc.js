var element = document.getElementsByClassName("scanButton");
var element1 = document.getElementsByClassName("writeButton");
var inputValue = document.getElementsByClassName("getIpValue");
setTimeout(function () {
  element[0].addEventListener("click", scanButton);
}, 1000);

setTimeout(function () {
  element1[0].addEventListener("click", writeButton);
}, 1000);

async function scanButton() {

  if ("NDEFReader" in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();

      $(".scanResult").html("Scan Started");
      ndef.addEventListener("readingerror", () => {
        $(".scanResult").html(
          "Argh! Cannot read data from the NFC tag. Try another one?"
        );
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        const decoder = new TextDecoder();
        $(".scanStrar").html(decoder.decode(message.records) +"/"+serialNumber);
      });
    } catch (error) {
      $(".scanResult").html("Argh! " + error);
    }
  } else {
    $(".scanResult").html("No NDEFReader!");
  }
}

async function writeButton() {
  var inputValue = document.getElementsByClassName("getIpValue");
   if ("NDEFReader" in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.write(inputValue[0].value);

    } catch (error) {
      $(".scanResult").html("Argh! " + error);
    }
  } else {
    $(".scanResult").html("No NDEFReader!");
  }
}
