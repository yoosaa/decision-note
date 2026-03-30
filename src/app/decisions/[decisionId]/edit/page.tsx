import { DecisionEditPage } from "@/src/presentation/src/pages/decision-edit-page";

type DecisionEditRouteProps = {
  params: Promise<{
    decisionId: string;
  }>;
};

export default async function DecisionEditRoute({
  params,
}: DecisionEditRouteProps) {
  const { decisionId } = await params;

  return <DecisionEditPage decisionId={decisionId} />;
}
