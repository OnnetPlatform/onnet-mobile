import client from '@Khayat/Graphql/Client';
import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';

export const useGemini = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const ask = useCallback(async (question: string) => {
    setLoading(true);
    const { data } = await client.mutate({
      mutation: gql`
        mutation Prompt($question: String) {
          prompt(question: $question)
        }
      `,
      variables: { question },
    });
    setLoading(false);
    console.log(data);
    return data.prompt;
  }, []);

  return { loading, ask };
};
