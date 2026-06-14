import DashboardCards from "./dashboard-cards";
import { Suspense } from "react";
import { getPaymentMethodPieChart, getReturningCustomerPieChart, getDeviceTypePieChart, getPengaruhDiskonBarChart } from "@/lib/dashboard/data-bawah";
import { getRataRataRatingPerKategoriBarChart, getAverageSessionPerDeviceBarChart, getKategoriProdukCustomer, getRatingVsSales } from "@/lib/dashboard/data-bawah-akhir";
import { getTotalDanTrenPenjualanLineChart, getViewsVsSalesLineChart, getTotalPenjualanPerKategoriBarChart, getEngagementPerKategoriBardanLineChart, getHargaVsTransaksiScatterplot, getCustomerActivityFunnelChart } from "@/lib/dashboard/data-atas-tengah";
import PieChartPaymentMethod from "@/components/dashboard/piechart-paymentmethod";
import PieChartReturningCustomer from "@/components/dashboard/piechart-returningcustomer";
import BarChartPengaruhDiskon from "@/components/dashboard/barchart-pengaruhdiskontanpa";
import PieChartDeviceType from "./piechart-devicetype";
import BarChartRatingKategori from "./barchart-rata2rating-kategoriproduk";
import BarChartSessionPerDevice from "./barchart-sessionduruation-perdevice";
import HeatmapKategoriCustomer from "./heatmap-transaksi-perkategori";
import ScatterChartRatingVsSales from "./scatterplot-ratingvssales";
import LineChartPenjualanDanTransaksi from "./linechart-penjualandantren";
import LineChartViewsVsSales from "./linechart-pageviewedvspenjualan";
import BarChartPenjualanKategori from "./barchart-totalpenjualan-perkategori";
import ChartEngagementKategori from "./barchart-linechar-enggamentperkategori";
import ScatterHargaVsPenjualan from "./scatterplot-hargavspenjualan";
import FunnelCustomerActivity from "./funnelchart-customeractivity";

export default async function Dashboard() {
    return (
        <div className="space-y-4">
            <Suspense fallback={<div>Memuat...</div>}>
                <DashboardCards />
            </Suspense>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Suspense fallback={<div>Memuat...</div>}>
                    <LineChartPenjualanDanTransaksiWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <BarChartPenjualanKategoriWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <LineChartViewsVsSalesWrapper />
                </Suspense>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Suspense fallback={<div>Memuat...</div>}>
                    <FunnelCustomerActivityWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <EngagementPerKategoriBardanLineChartWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <ScatterHargaVsPenjualanWrapper />
                </Suspense>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <Suspense fallback={<div>Memuat...</div>}>
                    <BarChartPengaruhDiskonWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <PieChartDeviceTypeWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <PieChartPaymentMethodWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <PieChartReturningCustomerWrapper />
                </Suspense>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <Suspense fallback={<div>Memuat...</div>}>
                    <BarChartRatingKategoriWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <BarChartSessionPerDeviceWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <HeatmapKategoriCustomerWrapper />
                </Suspense>
                <Suspense fallback={<div>Memuat...</div>}>
                    <ScatterChartRatingVsSalesWrapper />
                </Suspense>
            </div>
        </div>
    )
}

async function PieChartPaymentMethodWrapper() {
    const data = await getPaymentMethodPieChart();
    return <PieChartPaymentMethod data={data} />;
}

async function PieChartReturningCustomerWrapper() {
    const data = await getReturningCustomerPieChart();
    return <PieChartReturningCustomer data={data} />;
}

async function PieChartDeviceTypeWrapper() {
    const data = await getDeviceTypePieChart();
    return <PieChartDeviceType data={data} />;
}

async function BarChartPengaruhDiskonWrapper() {
    const data = await getPengaruhDiskonBarChart();
    return <BarChartPengaruhDiskon data={data} />;
}

async function BarChartRatingKategoriWrapper() {
    const data = await getRataRataRatingPerKategoriBarChart();
    return <BarChartRatingKategori data={data} />;
}

async function BarChartSessionPerDeviceWrapper() {
    const data = await getAverageSessionPerDeviceBarChart();
    return <BarChartSessionPerDevice data={data} />;
}

async function HeatmapKategoriCustomerWrapper() {
    const data = await getKategoriProdukCustomer();
    return <HeatmapKategoriCustomer data={data} />;
}

async function ScatterChartRatingVsSalesWrapper() {
    const data = await getRatingVsSales();
    return <ScatterChartRatingVsSales data={data} />;
}

async function LineChartPenjualanDanTransaksiWrapper() {
    const data = await getTotalDanTrenPenjualanLineChart();
    return <LineChartPenjualanDanTransaksi data={data} />;
}

async function LineChartViewsVsSalesWrapper() {
    const data = await getViewsVsSalesLineChart();
    return <LineChartViewsVsSales data={data} />;
}

async function BarChartPenjualanKategoriWrapper() {
    const data = await getTotalPenjualanPerKategoriBarChart();
    return <BarChartPenjualanKategori data={data} />;
}

async function EngagementPerKategoriBardanLineChartWrapper() {
    const data = await getEngagementPerKategoriBardanLineChart();
    return <ChartEngagementKategori data={data} />;
}

async function ScatterHargaVsPenjualanWrapper() {
    const data = await getHargaVsTransaksiScatterplot();
    return <ScatterHargaVsPenjualan data={data} />;
}

async function FunnelCustomerActivityWrapper() {
    const data = await getCustomerActivityFunnelChart();
    return <FunnelCustomerActivity data={data} />;
}