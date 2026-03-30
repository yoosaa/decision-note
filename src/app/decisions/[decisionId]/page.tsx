import { DecisionDetailPage } from "@/src/presentation/src/pages/decision-detail-page";

type DecisionDetailRouteProps = {
  params: Promise<{
    decisionId: string;
  }>;
};

export default async function DecisionDetailRoute({
  params,
}: DecisionDetailRouteProps) {
  const { decisionId } = await params;

  return <DecisionDetailPage decisionId={decisionId} />;
}
