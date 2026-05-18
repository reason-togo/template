import { cn } from "@/shared/lib/utils";

// Root 컴포넌트
interface CourseStepRootProps {
  children: React.ReactNode;
  className?: string;
}

const CourseStepRoot = ({ children, className }: CourseStepRootProps) => {
  return (
    <div className={cn("flex items-start gap-4", className)}>{children}</div>
  );
};

// Number 컴포넌트
interface CourseStepNumberProps {
  number: number;
  className?: string;
}

const CourseStepNumber = ({ number, className }: CourseStepNumberProps) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full",
        "bg-gradient-to-br from-primary-300 to-primary-400",
        "flex items-center justify-center",
        "text-white font-bold text-sm shadow-md",
        className
      )}
    >
      {number}
    </div>
  );
};

// Content 컴포넌트
interface CourseStepContentProps {
  children: React.ReactNode;
  className?: string;
}

const CourseStepContent = ({
  children,
  className,
}: CourseStepContentProps) => {
  return (
    <div className={cn("flex-1 space-y-1", className)}>{children}</div>
  );
};

// Title 컴포넌트
interface CourseStepTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CourseStepTitle = ({ children, className }: CourseStepTitleProps) => {
  return (
    <h4 className={cn("font-semibold text-secondary", className)}>
      {children}
    </h4>
  );
};

// Info 컴포넌트
interface CourseStepInfoProps {
  duration: string;
  cost: string;
  className?: string;
}

const CourseStepInfo = ({ duration, cost, className }: CourseStepInfoProps) => {
  return (
    <div className={cn("flex items-center gap-3 text-sm text-muted-foreground", className)}>
      <span>{duration}</span>
      <span>•</span>
      <span>{cost}</span>
    </div>
  );
};

// Export compound component
export const CourseStep = {
  Root: CourseStepRoot,
  Number: CourseStepNumber,
  Content: CourseStepContent,
  Title: CourseStepTitle,
  Info: CourseStepInfo,
};
