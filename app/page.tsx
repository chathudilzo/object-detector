"use client";
import ObjectDetection from "@/components/ObjectDetection";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [option, setOption] = useState("");
  const [delayMinutes, setDelayedMinutes] = useState("0");
  const [formValid, setFormValid] = useState(false);
  const router = useRouter();
  const handleCheckInputs = () => {
    if (email && option && delayMinutes) {
      setFormValid(true);
      router.push(
        `/live?email=${encodeURIComponent(
          email
        )}&option=${option}&delay=${delayMinutes}`
      );
    } else {
      setFormValid(false);
      alert("Please fill all fields.");
    }
  };

  return (
    <main className="flex w-full flex-col items-center justify-center py-6 px-6 md:px-16 lg:px-32">
      <div className="w-full h-screen flex-col justify-center items-center mt-30">
        <h1 className="text-6xl font-bold text-center gradient-title ">
          Your Trusted Security Partner
        </h1>

        <p className="text-white font-semibold text-center my-5">
          We help you to secure your values with a easy setup
        </p>

        <button className="block mt-10 glow-btn mx-auto">Try Now</button>

        <video
          src={"/hero.mp4"}
          className="w-full mt-10 rounded-2xl"
          autoPlay
          loop
          muted
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center px-4 py-10 bg-[#0a0a0a] text-white space-y-8 rounded-2xl shadow-xl border border-gray-800 max-w-xl mx-auto">
        <h3 className="font-bold text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Connect Now
        </h3>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full bg-gray-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="delay"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Start Detection After (Minutes)
          </label>
          <input
            id="delay"
            type="number"
            placeholder="e.g. 5"
            className="w-full bg-gray-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={delayMinutes}
            onChange={(e) => setDelayedMinutes(e.target.value)}
            min={0}
          />
        </div>

        <div className="w-full">
          <div className="w-full">
            <p className="mb-3 font-medium text-gray-300">
              Select Action on Detection:
            </p>
            <div className="flex flex-wrap gap-4">
              {["alarm", "email", "both"].map((opt) => (
                <label
                  key={opt}
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    className="accent-blue-500"
                    checked={option === opt}
                    onChange={() => setOption(opt)}
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckInputs}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-md"
        >
          Activate Monitoring
        </button>
        {formValid && (
          <a
            href="/live"
            className="mt-4 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition"
          >
            Go to Live Feed
          </a>
        )}
      </div>

      {/*  */}
    </main>
  );
}
