import os from "os";
import { exec } from "child_process";

// 平台信息
export function platform(): string {
  return process.platform;
}

// CPU 核心数
export function cpuCount(): number {
  return os.cpus().length;
}

// 系统运行时间（秒）
export function sysUptime(): number {
  return os.uptime();
}

// 进程运行时间（秒）
export function processUptime(): number {
  return process.uptime();
}

// 可用内存（MB）
export function freemem(): number {
  return os.freemem() / (1024 * 1024);
}

// 总内存（MB）
export function totalmem(): number {
  return os.totalmem() / (1024 * 1024);
}

// 可用内存百分比
export function freememPercentage(): number {
  return os.freemem() / os.totalmem();
}

// 获取 Linux 下的内存使用情况
export function freeCommand(): Promise<number> {
  return new Promise((resolve, reject) => {
    exec("free -m", (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const lines = stdout.split("\n");
      const str_mem_info = lines[1].replace(/[\s\n\r]+/g, " ");
      const mem_info = str_mem_info.split(" ");
      const total_mem = parseFloat(mem_info[1]);
      const free_mem = parseFloat(mem_info[3]);
      const buffers_mem = parseFloat(mem_info[5]);
      const cached_mem = parseFloat(mem_info[6]);
      const used_mem = total_mem - (free_mem + buffers_mem + cached_mem);
      resolve(used_mem - 2);
    });
  });
}

// 获取硬盘使用情况
export function harddrive(): Promise<[number, number, number]> {
  return new Promise((resolve, reject) => {
    exec("df -k", (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const lines = stdout.split("\n");
      const str_disk_info = lines[1].replace(/[\s\n\r]+/g, " ");
      const disk_info = str_disk_info.split(" ");
      const total = Math.ceil(
        (Number(disk_info[1]) * 1024) / Math.pow(1024, 2),
      );
      const used = Math.ceil((Number(disk_info[2]) * 1024) / Math.pow(1024, 2));
      const free = Math.ceil((Number(disk_info[3]) * 1024) / Math.pow(1024, 2));
      resolve([total, free, used]);
    });
  });
}

// 获取进程信息
export function getProcesses(nProcess: number = 0): Promise<string> {
  let command = "ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 10";
  if (nProcess > 0) {
    command = `ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n ${
      nProcess + 1
    }`;
  }
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const lines = stdout.split("\n");
      lines.shift();
      lines.pop();
      let result = "";
      lines.forEach((_item) => {
        const _str = _item.replace(/[\s\n\r]+/g, " ");
        const parts = _str.split(" ");
        result += `${parts[1]} ${parts[2]} ${parts[3]} ${parts[4].substring(
          parts[4].length - 25,
        )}\n`;
      });
      resolve(result);
    });
  });
}

// 所有负载平均值
export function allLoadavg(): string {
  const loads = os.loadavg();
  return `${loads[0].toFixed(4)},${loads[1].toFixed(4)},${loads[2].toFixed(4)}`;
}

// 特定时间的负载平均值
export function loadavg(_time?: 1 | 5 | 15): number {
  if (_time === undefined || (_time !== 5 && _time !== 15)) _time = 1;
  const loads = os.loadavg();
  let v = 0;
  if (_time === 1) v = loads[0];
  if (_time === 5) v = loads[1];
  if (_time === 15) v = loads[2];
  return v;
}

// 获取 CPU 空闲率
export function cpuFree(): Promise<number> {
  return getCPUUsage(true);
}

// 获取 CPU 使用率
export function cpuUsage(): Promise<number> {
  return getCPUUsage(false);
}

// 获取 CPU 信息
function getCPUUsage(free: boolean): Promise<number> {
  return new Promise((resolve) => {
    const stats1 = getCPUInfo();
    const startIdle = stats1.idle;
    const startTotal = stats1.total;
    setTimeout(() => {
      const stats2 = getCPUInfo();
      const endIdle = stats2.idle;
      const endTotal = stats2.total;
      const idle = endIdle - startIdle;
      const total = endTotal - startTotal;
      const perc = idle / total;
      if (free) {
        resolve(perc);
      } else {
        resolve(1 - perc);
      }
    }, 1000);
  });
}

// 获取 CPU 详细信息
function getCPUInfo(): { idle: number; total: number } {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;
  for (const cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    irq += cpu.times.irq;
    idle += cpu.times.idle;
  }
  total = user + nice + sys + idle + irq;
  return {
    idle,
    total,
  };
}

export default {
  platform,
  cpuCount,
  sysUptime,
  processUptime,
  freemem,
  totalmem,
  freememPercentage,
  freeCommand,
  harddrive,
  getProcesses,
  allLoadavg,
  loadavg,
  cpuFree,
  cpuUsage,
};
