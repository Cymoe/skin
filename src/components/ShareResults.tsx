import React, { useState } from 'react';
import { Share2, Check, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareResultsProps {
  colorPalette: {
    primary: string[];
    accent: string[];
    neutral: string[];
  };
}

export function ShareResults({ colorPalette }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareTitle = 'Check out my personalized color palette!';
  const shareText = `My color palette includes: Primary: ${colorPalette.primary.join(', ')}, Accent: ${colorPalette.accent.join(', ')}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Share2 className="w-5 h-5 text-teal-600" />
        <h3 className="text-xl font-semibold text-gray-800">Share Your Colors</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Social Share Buttons */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-all"
        >
          <Twitter className="w-5 h-5" />
          <span className="font-medium">Twitter</span>
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#4267B2] text-white hover:bg-opacity-90 transition-all"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">Facebook</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0077B5] text-white hover:bg-opacity-90 transition-all"
        >
          <Linkedin className="w-5 h-5" />
          <span className="font-medium">LinkedIn</span>
        </a>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all relative"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              <span className="font-medium">Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Preview Card */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-3">Preview</h4>
        <div className="flex gap-2 mb-3">
          {Object.values(colorPalette).flat().slice(0, 5).map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">{shareText}</p>
      </div>
    </div>
  );
}