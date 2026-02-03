interface PlayDemoButtonProps {
  gameUrl: string;
}

export default function PlayDemoButton({ gameUrl }: PlayDemoButtonProps) {
  const handlePlayDemo = () => {
    window.open(gameUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handlePlayDemo}
      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 min-h-[44px]"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </svg>
      Demo Play
    </button>
  );
}
