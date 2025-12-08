import Link from 'next/link';
import { ArrowRight, BarChart3, Search, Brain, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Sorting Algorithms',
      description:
        'Visualize Bubble, Selection, Insertion, and Merge sort step by step.',
      icon: BarChart3,
      href: '/sort',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Searching Algorithms',
      description:
        'Watch Linear, Binary, Jump, and Exponential search in action.',
      icon: Search,
      href: '/search',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      lightBg: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'DP & Greedy',
      description:
        'Compare Dynamic Programming vs Greedy approaches on the same problem.',
      icon: Brain,
      href: '/algo',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const highlights = [
    { label: 'Algorithms', value: '10+' },
    { label: 'Interactive Controls', value: '✓' },
    { label: 'Step-by-Step', value: '✓' },
    { label: 'Speed Control', value: '✓' },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="w-full p-8 mb-6 text-center bg-white border border-gray-200 shadow-lg rounded-3xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="w-10 h-10 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Algorithm Visualizer
          </h1>
        </div>
        <p className="max-w-2xl mx-auto mb-6 text-gray-600">
          Understand how algorithms work through interactive, step-by-step
          visualizations. Perfect for learning sorting, searching, and
          optimization techniques.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50"
            >
              <p className="text-xl font-bold text-yellow-500">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/sort"
          className="inline-flex items-center gap-2 px-6 py-3 text-white transition bg-yellow-500 rounded-xl hover:bg-yellow-600 group"
        >
          Get Started
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className={`group p-6 bg-white border ${feature.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${feature.lightBg} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon
                  className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`}
                />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold text-gray-800">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-600">
                {feature.description}
              </p>

              {/* Link */}
              <div className="flex items-center gap-1 text-sm font-medium text-gray-500 group-hover:text-gray-800">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="w-full p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 text-center rounded-xl bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 text-white bg-yellow-500 rounded-full">
              1
            </div>
            <h4 className="font-semibold text-gray-700">Choose Algorithm</h4>
            <p className="text-xs text-gray-500">
              Select from sorting, searching, or optimization algorithms
            </p>
          </div>
          <div className="p-4 text-center rounded-xl bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 text-white bg-yellow-500 rounded-full">
              2
            </div>
            <h4 className="font-semibold text-gray-700">Customize Input</h4>
            <p className="text-xs text-gray-500">
              Enter your own data or generate random values
            </p>
          </div>
          <div className="p-4 text-center rounded-xl bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 text-white bg-yellow-500 rounded-full">
              3
            </div>
            <h4 className="font-semibold text-gray-700">Watch & Learn</h4>
            <p className="text-xs text-gray-500">
              Control speed, pause, step through each operation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
