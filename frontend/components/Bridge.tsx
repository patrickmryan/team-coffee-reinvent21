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

const Bridge = ({ next }: any) => {
  const [address, setAddress] = useState("");
  const [m2, setm2] = useState(10);
  const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState<Savings>();

  const [showSlider, setShowSlider] = useState(false);
  const [radius, setRadius] = useState(1);

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
    <div>
      {!showSlider && (
        <>
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
              type="text"
              className="text-black p-2 rounded-md"
              placeholder="Roof m2"
              value={m2}
              onChange={(e) => setm2(Number(e.target.value))}
              onKeyPress={handleKeyPress}
            />
            <button onClick={submitAddress}>Submit</button>
          </div>
        </>
      )}
      {/* Results */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-200"></div>
        </div>
      )}{" "}
      {savings && (
        <div className="flex flex-col items-center">
          <div className="border-4 border-dashed rounded-md text-left p-8 mb-8 bg-gray-500 bg-opacity-50">
            <h2 className="text-2xl mb-4 text-center">
              {showSlider
                ? `Scale from your house to your community (${radius} miles)`
                : `Your address: ${address}`}
            </h2>

            {showSlider && (
              <div className="text-center flex justify-between w-48 mx-auto mb-6">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    className={classNames(
                      "border-2 border-white w-8 h-8 hover:bg-white hover:bg-opacity-20",
                      { "bg-white bg-opacity-50": n === radius }
                    )}
                    onClick={() => setRadius(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

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
                    {savings.kwhPerM2PerDay * m2 * 365 * radius} kwh
                  </strong>{" "}
                  for your {showSlider ? "community" : "house"} per year
                </p>
                <p>
                  Which equals{" "}
                  <strong className="text-2xl">
                    {savings.CO2eqSavedPerYearPerM2 * m2 * radius} kg
                  </strong>{" "}
                  of CO<sub>2</sub> savings per year for your{" "}
                  {showSlider ? "community" : "house"}
                </p>
                <p>
                  Which corresponds to{" "}
                  <strong className="text-2xl">
                    ${savings.costsSavedPerYearPerM2 * m2 * radius}
                  </strong>{" "}
                  of potential savings per year for your{" "}
                  {showSlider ? "community" : "house"}.
                </p>
              </div>
            </div>
          </div>
          {showSlider ? (
            <div className="text-2xl text-center">
              Let your mayor/governor/representative know and text them today.
              These results may make them think and help accelerate the
              transition to sustainable energy. Feel free to use our template
              and get the message across in a matter of seconds!
              <div className="mt-8">
                <a
                  href="mailto:test@example.com?subject=Rapidly reduce your carbon footprint!&body=Greetings, I am sending this email to bring to your attention, changes that you could make and reduce carbon emission easily and contribute to slowing down climate change. Did you know that you can save on average 500kWH a month for each household which results in $100 saving per house for electricity production and will result in 500 carbon reduction. Please review the details on our webpage and feel free to get in touch with us directly with any questions. Thank you so much! The Team Coffee"
                  className="text-3xl border-2 border-white px-9 py-2 rounded-xl hover:bg-white hover:bg-opacity-20"
                  onClick={() => setShowSlider(true)}
                >
                  Send email
                </a>
              </div>
            </div>
          ) : (
            <div className="text-2xl text-center mt-8">
              But am I not just a drop in the ocean?
              <div className="mt-8">
                <button
                  className="text-3xl border-2 border-white px-9 py-2 rounded-xl hover:bg-white hover:bg-opacity-20"
                  onClick={() => setShowSlider(true)}
                >
                  Scale the radius, scale the impact!
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bridge;
