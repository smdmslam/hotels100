import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import type { PricingIntelligence } from '../../data/types';
import styles from './PriceCurveChart.module.css';

interface PriceCurveChartProps {
  pricing: PricingIntelligence;
  hotelName?: string;
}

export const PriceCurveChart: React.FC<PriceCurveChartProps> = ({ pricing, hotelName }) => {
  if (pricing.status !== 'complete' || !pricing.dataPoints || pricing.dataPoints.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Pricing intelligence collection is {pricing.status === 'collecting' ? 'in progress' : 'not started'} for this property.</p>
        {pricing.dmwInterpretation && <p className={styles.interpretation}>{pricing.dmwInterpretation}</p>}
      </div>
    );
  }

  // Format date for display in tooltip
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      const rateVal = point.observedRate ?? point.rate ?? 0;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipDate}>{point.tenor ? `${point.tenor} (${formatDate(point.date)})` : formatDate(point.date)}</p>
          <p className={styles.tooltipRate}>
            <strong>Observed Rate:</strong> {pricing.currency || ''} {rateVal} / night
          </p>
          {point.roomType && <p className={styles.tooltipNotes}>{point.roomType}</p>}
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (tickItem: any) => {
    if (tickItem && tickItem.length <= 4) return tickItem;
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  // Map and sort data points chronologically ensuring rate / observedRate exist
  const sortedData = [...pricing.dataPoints]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((pt) => ({
      ...pt,
      rate: pt.observedRate ?? pt.rate ?? 0,
      observedRate: pt.observedRate ?? pt.rate ?? 0,
      monthLabel: pt.tenor || (pt.date ? new Date(pt.date).toLocaleDateString('en-US', { month: 'short' }) : '')
    }));

  const medianVal = pricing.summaryStats?.medianObserved || pricing.medianObservedRate || Math.round(sortedData.reduce((acc, p) => acc + p.rate, 0) / sortedData.length);
  const highestVal = pricing.summaryStats?.highestObserved || pricing.highestObservedRate || Math.max(...sortedData.map(p => p.rate));

  return (
    <div className={styles.container}>
      <div className={styles.chartHeader}>
        {hotelName && (
          <h3 className={styles.chartHotelName}>{hotelName} — 12-Month Rate Seasonality Curve</h3>
        )}
        <div className={styles.chartMetaRow}>
          <div className={styles.chartMeta}>
            <span className={styles.metaLabel}>Basis</span>
            <span className={styles.metaValue}>{pricing.roomBasis || 'Standard Deluxe Room'}</span>
          </div>
          <div className={styles.chartMeta}>
            <span className={styles.metaLabel}>Median Rate</span>
            <span className={styles.metaValue}>{pricing.currency || ''} {medianVal}</span>
          </div>
          <div className={styles.chartMeta}>
            <span className={styles.metaLabel}>Highest Rate</span>
            <span className={styles.metaValue}>{pricing.currency || ''} {highestVal}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={sortedData} margin={{ top: 25, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(18, 18, 18, 0.12)" />
            <XAxis 
              dataKey="monthLabel" 
              tickFormatter={formatXAxis} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fill: '#555' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fill: '#555' }}
              tickFormatter={(val) => `${val}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#C5A059" 
              strokeWidth={3}
              connectNulls={true}
              dot={{ r: 5, fill: '#121212', stroke: '#C5A059', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#C5A059', stroke: '#121212', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {pricing.dmwInterpretation && (
        <div className={styles.interpretation}>
          <h4>DMW Interpretation</h4>
          <p>{pricing.dmwInterpretation}</p>
        </div>
      )}
    </div>
  );
};
