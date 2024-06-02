"use client"; // Error components must be Client components

import { Button, Heading } from '@chakra-ui/react';
import { useEffect } from "react";


// TODO: error boundary?
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Heading mb={4}>予期せぬエラーが発生しました。</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}