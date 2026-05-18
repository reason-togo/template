import { CourseStep } from "@/entities/course/ui/CourseStep";
import { TransportInfo } from "@/entities/course/ui/TransportInfo";
import { cn } from "@/shared/lib/utils";

// Root 컴포넌트
interface CourseListRootProps {
  children: React.ReactNode;
  className?: string;
}

const CourseListRoot = ({ children, className }: CourseListRootProps) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};

// Item 컴포넌트
interface CourseListItemProps {
  number: number;
  title: string;
  duration: string;
  cost: string;
  className?: string;
}

const CourseListItem = ({
  number,
  title,
  duration,
  cost,
  className,
}: CourseListItemProps) => {
  return (
    <CourseStep.Root className={className}>
      <CourseStep.Number number={number} />
      <CourseStep.Content>
        <CourseStep.Title>{title}</CourseStep.Title>
        <CourseStep.Info duration={duration} cost={cost} />
      </CourseStep.Content>
    </CourseStep.Root>
  );
};

// Transport 컴포넌트
interface CourseListTransportProps {
  type: "walk" | "car";
  duration: string;
  className?: string;
}

const CourseListTransport = ({
  type,
  duration,
  className,
}: CourseListTransportProps) => {
  return <TransportInfo type={type} duration={duration} className={className} />;
};

// Export compound component
export const CourseList = {
  Root: CourseListRoot,
  Item: CourseListItem,
  Transport: CourseListTransport,
};
