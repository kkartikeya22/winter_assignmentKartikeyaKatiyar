import { Disclosure } from "@headlessui/react";

export default function EventsTimeline() {
  const events = [
    { time: "10:00 AM", event: "Large transaction flagged" },
    { time: "11:30 AM", event: "Multiple failed login attempts" },
    { time: "01:00 PM", event: "Unusual location detected" },
  ];

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Events Timeline</h2>
      <div className="space-y-4">
        {events.map((item, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex justify-between w-full px-4 py-3 text-sm font-medium text-left bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
                    open ? "bg-indigo-50 text-indigo-600" : "text-gray-600"
                  }`}
                >
                  <span>{item.time}</span>
                  <span>{open ? "-" : "+"}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  {item.event}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
