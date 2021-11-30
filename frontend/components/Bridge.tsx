import { useState } from "react";
import Image from "next/image";

type Savings = {
  kwhPerM2PerDay: number;
  co2eqSavedPerYearPerM2: number;
  costsSavedPerYearPerM2: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const round = (number: number) => {
  return Math.round(number * 100) / 100;
};

const Bridge = () => {
  const [address, setAddress] = useState("");
  const [m2, setm2] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState<Savings>();

  const submitAddress = async () => {
    setLoading(true);
    await delay(1000);

    const url = `/api/estimate?address=${address}`;
    fetch(url, { mode: "no-cors" })
      .then((response) => response.json())
      .then((json: Savings) => {
        setLoading(false);
        setSavings({
          kwhPerM2PerDay: json.kwhPerM2PerDay,
          co2eqSavedPerYearPerM2: json.co2eqSavedPerYearPerM2,
          costsSavedPerYearPerM2: json.costsSavedPerYearPerM2,
        });
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      submitAddress();
    }
  };

  return (
    <div>
      <div className="text-3xl leading-relaxed text-center">
        So let&apos;s find out if YOUR HOUSE can help the transition to
        sustainable energy!
      </div>
      <div className="flex justify-center gap-4 my-8 mt-16">
        <input
          type="text"
          className="text-black p-2 rounded-md"
          placeholder="Your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="number"
          className="text-black p-2 rounded-md"
          placeholder="Roof m2"
          value={m2}
          onChange={(e) => setm2(Number(e.target.value))}
          onKeyPress={handleKeyPress}
        />
        <button onClick={submitAddress}>Submit</button>
      </div>
      {/* Results */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-200"></div>
        </div>
      )}{" "}
      {savings && (
        <div className="border-4 border-dashed rounded-md text-left p-8 mb-8 bg-gray-500 bg-opacity-50">
          <h2 className="text-4xl mb-4">Your address: {address}</h2>

          <div className="flex items-center gap-4">
            <Image
              src="/sun-icon.svg"
              alt="Sun icon"
              width={150}
              height={150}
            />
            <div>
              <p>
                You can save{" "}
                <strong className="text-2xl">
                  {round(savings.kwhPerM2PerDay * (m2 || 1) * 365)} kwh
                </strong>{" "}
                for your house per year
              </p>
              <p>
                Which equals{" "}
                <strong className="text-2xl">
                  {round(savings.co2eqSavedPerYearPerM2 * (m2 || 1))} kg
                </strong>{" "}
                of CO<sub>2</sub> savings per year for your house
              </p>
              <p>
                Which corresponds to{" "}
                <strong className="text-2xl">
                  ${round(savings.costsSavedPerYearPerM2 * (m2 || 1))}
                </strong>{" "}
                of potential savings per year for your house.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bridge;
