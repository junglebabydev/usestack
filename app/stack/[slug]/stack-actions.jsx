"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareModal from "@/components/ui/share-modal";
import { Share2, Bookmark, Heart } from "lucide-react";

export default function StackActions({ stackId }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowShareModal(true)}
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
      <Button
        variant={saved ? "default" : "outline"}
        className="flex items-center gap-2"
        onClick={handleSave}
      >
        <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved" : "Save"}
      </Button>
      {/*
      <Button
        variant={liked ? "default" : "outline"}
        className="flex items-center gap-2"
        onClick={handleLike}
      >
        <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
        {liked ? "Liked" : "Like"}
      </Button>
        */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
        title="Check out this AI Stack"
        description="I found this amazing AI stack that you might be interested in!"
      />
    </>
  );
}
