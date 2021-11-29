import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";

type Savings = {
  kwhPerM2PerDay: number;
  CO2eqSavedPerYearPerM2: number;
  costsSavedPerYearPerM2: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState<Savings>();

  const submitAddress = async () => {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    setSavings({
      kwhPerM2PerDay: 12,
      CO2eqSavedPerYearPerM2: 42,
      costsSavedPerYearPerM2: 420,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      submitAddress();
    }
  };

  return (
    <div className="min-h-screen py-2 bg-solar text-white">
      <Head>
        <title>wind&sun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-20 text-center">
        <h1
          className={classNames("text-6xl font-bold", {
            "mt-44": !savings,
            "mt-12": savings,
          })}
        >
          wind&sun
        </h1>
        <div className="flex justify-center gap-4 my-8">
          <input
            type="text"
            className="text-black p-2 rounded-md"
            placeholder="Your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
                    {savings.kwhPerM2PerDay} kwh
                  </strong>{" "}
                  per square meter per day
                </p>
                <p>
                  Which equals{" "}
                  <strong className="text-2xl">
                    {savings.CO2eqSavedPerYearPerM2} kg
                  </strong>{" "}
                  of CO<sub>2</sub> savings per year per square meter
                </p>
                <p>
                  Which corresponds to{" "}
                  <strong className="text-2xl">
                    ${savings.costsSavedPerYearPerM2}
                  </strong>{" "}
                  of potential savings per year per square meter.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by us
        </a>
      </footer>
    </div>
  );
};

export default Home;
