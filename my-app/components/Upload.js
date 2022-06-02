import { ethers } from "ethers";
import { useState } from "react";
import abi from "../constants/abi";
import QRCode from "react-qr-code";

const Upload = (props) => {
  const contractAddress = "0x17E105B0dFDD153Da61bb3040eF53Ae4EFCa8922";
  const contractABI = abi.abi;

  const [name, setName] = useState("");
  const [netContent, setNetContent] = useState("");
  const [license, setLicense] = useState("");
  const [batchNum, setBatchNum] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIndegredients] = useState("");
  const [index, setIndex] = useState(1);

  const [value, setValue] = useState("");

  const incrementIndex = () => {
    setIndex((prevCount) => prevCount + 1);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onNetChange = (event) => {
    setNetContent(event.target.value);
  };

  const onLicenseChange = (event) => {
    setLicense(event.target.value);
  };

  const onBatchNumChange = (event) => {
    setBatchNum(event.target.value);
  };

  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const onIngredientsChange = (event) => {
    setIndegredients(event.target.value);
  };

  const combinedData = props.account + ";" + index;
  async function upload() {
    const provider = props.provider;
    const signer = provider.getSigner();
    const manufacturer = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    try {
      console.log(props.provider);
      console.log("Uploading details");
      const uploadData = await manufacturer.setDrugDetails(
        name ? name : window.alert("Please enter all details"),
        netContent ? netContent : window.alert("Please enter all details"),
        license ? license : window.alert("Please enter all details"),
        batchNum ? batchNum : window.alert("Please enter all details"),
        price ? price : window.alert("Please enter all details"),
        ingredients ? ingredients : window.alert("Please enter all details")
      );
      await uploadData.wait();
      console.log("Mined ", uploadData.hash);
      console.log("Data successfully uploaded!");
      setName("");
      setNetContent("");
      setLicense("");
      setBatchNum("");
      setPrice("");
      setIndegredients("");
      const address = props.account;
      console.log(address);
      console.log(index);
      const viewData = await manufacturer.getDrugDetails(address, index);
      setValue(combinedData);
      console.log(viewData.name);
      incrementIndex();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="center">
      <main>
        {props.active ? (
          <div>
            <form>
              <h3>Upload Drug Details</h3>
              <br />
              <div>
                <label>Drug Name:</label>
                <br />
                <input id="name" type="text" onChange={onNameChange} />
              </div>
              <div>
                <label>Net Content: (in ml)</label>
                <br />
                <input id="number" min="1" type="text" onChange={onNetChange} />
              </div>
              <div>
                <label>Mfg License Num:</label>
                <br />
                <input id="name" type="text" onChange={onLicenseChange} />
              </div>
              <div>
                <label>Batch No:</label>
                <br />
                <input
                  id="number"
                  type="text"
                  min="1"
                  onChange={onBatchNumChange}
                />
              </div>
              <div>
                <label>Drug Price: (in Rs)</label>
                <br />
                <input
                  id="price"
                  type="number"
                  min="1"
                  onChange={onPriceChange}
                />
              </div>
              <div>
                <label>Ingredients:</label>
                <br />
                <input id="name" type="text" onChange={onIngredientsChange} />
              </div>
              <br />
              <button type="button" onClick={() => upload()}>
                Upload
              </button>
            </form>
            <QRCode value={value} />
          </div>
        ) : (
          <>Please Connect to MetaMask</>
        )}
      </main>
    </div>
  );
};

export default Upload;
