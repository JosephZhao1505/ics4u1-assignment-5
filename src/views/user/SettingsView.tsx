import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const [value, setValue] = useState(userName);
  const [message, setMessage] = useState<{ text: string; color: string } | null>(null);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Profile</h2>
          <p className="text-gray-400 text-sm">Update your profile</p>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Username</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => {
              setValue(event.target.value);
              setMessage(null);
            }}
            placeholder="Enter your name"
            type="text"
            value={value}
          />
          {message && <p className={`text-sm ${message.color}`}>{message.text}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="caution">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setMessage({ color: "text-red-500", text: "Username cannot be empty" });
                return;
              } else if (value.length > 20) {
                setMessage({ color: "text-red-500", text: "Username too long" });
              } else {
                setUserName(trimmed);
                setMessage({ color: "text-green-500", text: "Username updated successfully" });
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};
