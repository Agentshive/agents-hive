"use client";

import React, { useState } from "react";
import { NewsletterModal } from "./modal";
import { Button } from "~/components/web/ui/button";
import { ArrowRight } from "lucide-react";

const ModalWrapper: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => setModalVisible(true)}
        className="rounded-[4px] bg-black text-white border border-white hover:border-gray-300"
      >
        Join Community
      </Button>

      <NewsletterModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <h2 className="text-2xl font-bold mb-4">Explore AI Agents</h2>
        <Button className="mt-4" onClick={() => setModalVisible(false)}>
          Close
        </Button>
      </NewsletterModal>
    </>
  );
};

export default ModalWrapper;
